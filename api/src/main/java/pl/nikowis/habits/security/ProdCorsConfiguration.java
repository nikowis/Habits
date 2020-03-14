package pl.nikowis.habits.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pl.nikowis.habits.config.Profiles;

@Configuration
@Profile(Profiles.PROD)
public class ProdCorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://192.168.0.199:3000", "http://89.65.58.225:3000").allowedMethods("*").allowedHeaders("*").allowCredentials(true);
            }
        };
    }
}