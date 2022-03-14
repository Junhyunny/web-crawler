package web.crawler.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import web.crawler.backend.dto.UrlDto;

@RestController
public class WebPageController {

    private final RestTemplate restTemplate;

    public WebPageController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/html-document")
    public String getHtmlDocument(@RequestBody UrlDto urlDto) {
        ResponseEntity<String> response = restTemplate.getForEntity(urlDto.getUrl(), String.class);
        return response.getBody();
    }
}
