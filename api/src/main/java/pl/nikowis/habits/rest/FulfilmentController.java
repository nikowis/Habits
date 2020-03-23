package pl.nikowis.habits.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.habits.dto.FulfilableHabitDTO;
import pl.nikowis.habits.dto.FulfillHabitRequestDTO;
import pl.nikowis.habits.security.SecurityConstants;
import pl.nikowis.habits.service.FulfilmentService;

import java.util.List;

@RestController
@RequestMapping(path = FulfilmentController.FULFILMENTS_ENDPOINT)
@Secured(SecurityConstants.ROLE_USER)
public class FulfilmentController {

    public static final String FULFILMENTS_ENDPOINT = "/fulfilments";
    @Autowired
    private FulfilmentService fulfilmentService;

    @PostMapping
    public FulfilableHabitDTO fulfill(@Validated @RequestBody FulfillHabitRequestDTO fulfilDTO) {
        return fulfilmentService.fulfilHabit(fulfilDTO);
    }

    @GetMapping
    public Page<FulfilableHabitDTO> dailyHabitsList(Pageable pageable) {
        return fulfilmentService.getDailyFulfilments(pageable);
    }
}
