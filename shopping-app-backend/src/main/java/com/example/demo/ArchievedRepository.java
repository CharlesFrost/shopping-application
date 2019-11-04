package com.example.demo;

import com.example.demo.models.ArchievedLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchievedRepository extends JpaRepository<ArchievedLists, Long> {
}
