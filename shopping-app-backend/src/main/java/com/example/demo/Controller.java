package com.example.demo;

import com.example.demo.models.ArchievedLists;
import com.example.demo.models.Price;
import com.example.demo.models.ShoppingList;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {
    private ShoppingListsRepository shoppingListsRepository;
    private ArchievedRepository archievedRepository;

    public Controller(ShoppingListsRepository shoppingListsRepository, ArchievedRepository archievedRepository) {
        this.shoppingListsRepository = shoppingListsRepository;
        this.archievedRepository = archievedRepository;
    }

    ////////////////// actual list endpoints /////////////////////////////
    @GetMapping("/list")
    public List<ShoppingList> getAll() {
        return shoppingListsRepository.findAll();
    }

    @GetMapping("/list/{id}")
    public ShoppingList getOne(@PathVariable(name = "id") Long id) {
        return shoppingListsRepository.getOne(id);
    }

    @PostMapping("/list")
    public ShoppingList save(@RequestBody @Valid ShoppingList shoppingList) {
        return shoppingListsRepository.save(shoppingList);
    }

    @DeleteMapping("/list/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        shoppingListsRepository.deleteById(id);
    }



    ////////////////// archieved lists endpoints //////////////////////////

    @PostMapping("/archives")
    @Transactional
    public ArchievedLists getAllArchives(@RequestBody Price price) {
        List<ShoppingList> shoppingLists = shoppingListsRepository.findAll();
        List<String> products = shoppingLists.stream()
                .map(shoppingList -> shoppingList.getProduct())
                .collect(Collectors.toList());
        ArchievedLists archievedList = new ArchievedLists();
        archievedList.setDate(LocalDateTime.now());
        archievedList.setDone(true);
        archievedList.setProduct(products);
        archievedList.setPrice(price.getPrice());
        shoppingListsRepository.deleteAll();
        return archievedRepository.save(archievedList);
    }

    @GetMapping("/archives/{id}")
    public ArchievedLists getOneArchieve(@PathVariable(name = "id") Long id) {
        return archievedRepository.getOne(id);
    }

    @GetMapping("/archives")
    public List<ArchievedLists> getAllArchieve() {
        List<ArchievedLists> lista = archievedRepository.findAll();
        lista.sort((o1, o2) -> {
            if (o1.getDate().isAfter(o2.getDate())) {
                return -1;
            } else {
                return 1;
            }
        });
        return lista;
    }

    @DeleteMapping("/archives/{id}")
    public void deleteArchieve(@PathVariable(name = "id") Long id) {
        archievedRepository.deleteById(id);
    }

    @EventListener(ApplicationStartedEvent.class)
    public void init() {
        shoppingListsRepository.save(new ShoppingList("Mleko"));
        shoppingListsRepository.save(new ShoppingList("Patleania"));
        shoppingListsRepository.save(new ShoppingList("Płyn do mycia naczyn"));
    }
}
