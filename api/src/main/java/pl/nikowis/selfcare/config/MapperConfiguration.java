package pl.nikowis.selfcare.config;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import pl.nikowis.selfcare.dto.CreateGoalDTO;
import pl.nikowis.selfcare.dto.FulfilableGoalDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.model.Goal;
import pl.nikowis.selfcare.model.User;
import pl.nikowis.selfcare.model.UserDetailsImpl;

public class MapperConfiguration {

    public static MapperFactory mapperFactory() {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();

        mapperFactory.classMap(Goal.class, GoalDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(User.class, UserDetailsImpl.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Goal.class, GoalDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Goal.class, CreateGoalDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Goal.class, FulfilableGoalDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        return mapperFactory;
    }
}
