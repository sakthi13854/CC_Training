package com.urlshortener.controller;

import com.urlshortener.dto.UrlRequestDto;
import com.urlshortener.dto.UrlResponseDto;
import com.urlshortener.service.UrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/urls")
@RequiredArgsConstructor
public class UrlController {

    private final UrlService urlService;

    @PostMapping
    public ResponseEntity<UrlResponseDto> shortenUrl(@Valid @RequestBody UrlRequestDto requestDto) {
        UrlResponseDto response = urlService.shortenUrl(requestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<UrlResponseDto>> getAllUrls(Pageable pageable) {
        return ResponseEntity.ok(urlService.getAllUrls(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UrlResponseDto> getUrlDetails(@PathVariable Long id) {
        return ResponseEntity.ok(urlService.getUrlDetails(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UrlResponseDto> updateUrl(@PathVariable Long id, @Valid @RequestBody UrlRequestDto requestDto) {
        return ResponseEntity.ok(urlService.updateUrl(id, requestDto));
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableUrl(@PathVariable Long id) {
        urlService.disableUrl(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUrl(@PathVariable Long id) {
        urlService.deleteUrl(id);
        return ResponseEntity.noContent().build();
    }
}
