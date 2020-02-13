package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.FulfilableGoalDTO;
import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.service.FulfilmentService;

import java.util.List;

@RestController
@RequestMapping(path = FulfilmentController.FULFILMENTS_ENDPOINT)
public class FulfilmentController {

    public static final String FULFILMENTS_ENDPOINT = "/fulfilments";
    @Autowired
    private FulfilmentService fulfilmentService;

    @PostMapping
    public FulfilableGoalDTO fulfill(@Validated @RequestBody FulfillGoalRequestDTO fulfilDTO) {
        return fulfilmentService.fulfilGoal(fulfilDTO);
    }

    @GetMapping
    public List<FulfilableGoalDTO> dailyGoalList() {
        return fulfilmentService.getDailyFulfilments();
    }
}
