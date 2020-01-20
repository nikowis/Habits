package pl.nikowis.selfcare.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.dto.FulfillGoalRequestDTO;
import pl.nikowis.selfcare.dto.GoalDTO;
import pl.nikowis.selfcare.service.FulfilmentService;

@RestController
@RequestMapping(path = "/fulfilments")
public class FulfilmentController {

    @Autowired
    private FulfilmentService fulfilmentService;

    @PostMapping
    public GoalDTO createGoal(@RequestBody FulfillGoalRequestDTO fulfilDTO) {
        return fulfilmentService.fulfilGoal(fulfilDTO);
    }

}
