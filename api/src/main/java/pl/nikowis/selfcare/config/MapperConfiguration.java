package pl.nikowis.selfcare.config;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Goal;

public class MapperConfiguration {

    public static MapperFactory mapperFactory() {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();

        mapperFactory.classMap(Goal.class, GoalDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .register();

        return mapperFactory;
    }
}
