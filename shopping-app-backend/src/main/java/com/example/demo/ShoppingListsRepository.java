package com.example.demo;

import com.example.demo.models.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListsRepository extends JpaRepository<ShoppingList, Long> {
}
