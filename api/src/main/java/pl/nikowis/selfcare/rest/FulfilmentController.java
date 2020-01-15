package pl.nikowis.selfcare.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.nikowis.selfcare.model.FulfillGoalDTO;
import pl.nikowis.selfcare.model.Fulfilment;
import pl.nikowis.selfcare.service.FulfilmentService;

@RestController
@RequestMapping(path = "/fulfilments")
public class FulfilmentController {

    private FulfilmentService fulfilmentService;

    @PostMapping
    public Fulfilment createGoal(@RequestBody FulfillGoalDTO fulfilDTO) {
        return fulfilmentService.fulfilGoal(fulfilDTO);
    }

}
