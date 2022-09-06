package nl.fontys.s3.spotforus.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class TestController {
    @GetMapping("/test")
    public int test() {
        return 10;
    }
}
