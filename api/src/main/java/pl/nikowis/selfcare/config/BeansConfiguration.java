package pl.nikowis.selfcare.config;

import ma.glasnost.orika.MapperFacade;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeansConfiguration {

    @Bean
    public MapperFacade mapperFacade() {
       return MapperConfiguration.mapperFactory().getMapperFacade();
    }

}