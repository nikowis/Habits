package pl.nikowis.selfcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SelfCareApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(SelfCareApplication.class, args);
    }

}
