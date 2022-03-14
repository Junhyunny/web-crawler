package web.crawler.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.RestTemplate;
import web.crawler.backend.dto.UrlDto;

import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class WebPageControllerTests {

    UrlDto urlDto;
    ObjectMapper mapper;

    RestTemplate restTemplate;
    MockMvc mockMvc;

    @BeforeEach
    void setUp() {

        urlDto = new UrlDto("http://localhost:8080/test");
        mapper  = new ObjectMapper();

        restTemplate = Mockito.mock(RestTemplate.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new WebPageController(restTemplate)).build();

        when(restTemplate.getForEntity(urlDto.getUrl(), String.class))
                .thenReturn(ResponseEntity.of(Optional.of("")));
    }

    @Test
    void getHtmlDocument_isOk() throws Exception {

        mockMvc.perform(post("/html-document")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(urlDto)))
                .andExpect(status().isOk());
    }

    @Test
    public void givenUrlDto_getHtmlDocument_redirectRequestToGivenUrl() throws Exception {

        mockMvc.perform(post("/html-document")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(urlDto)))
                .andExpect(status().isOk());


        verify(restTemplate, times(1)).getForEntity(urlDto.getUrl(), String.class);
    }

    @Test
    public void givenUrlDto_getHtmlDocument_returnHtmlDocument() throws Exception {

        when(restTemplate.getForEntity(urlDto.getUrl(), String.class))
                .thenReturn(ResponseEntity.of(Optional.of("<div></div>")));


        mockMvc.perform(post("/html-document")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(urlDto)))
                .andExpect(jsonPath("$", equalTo("<div></div>")));
    }
}
