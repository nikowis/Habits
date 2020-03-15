package pl.nikowis.habits.config;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import pl.nikowis.habits.dto.CreateHabitDTO;
import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.HabitDTO;
import pl.nikowis.habits.model.Habit;
import pl.nikowis.habits.model.User;
import pl.nikowis.habits.model.UserDetailsImpl;

public class MapperConfiguration {

    public static MapperFactory mapperFactory() {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();

        mapperFactory.classMap(Habit.class, HabitDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(User.class, UserDetailsImpl.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Habit.class, HabitDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Habit.class, CreateHabitDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        mapperFactory.classMap(Habit.class, FulfilableHabitDTO.class)
                .mapNulls(false)
                .mapNullsInReverse(false)
                .byDefault()
                .register();

        return mapperFactory;
    }
}
