package web.crawler.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UrlDto {

    private String url;

    public UrlDto(String url) {
        this.url = url;
    }
}
