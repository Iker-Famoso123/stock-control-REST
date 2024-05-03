package org.udg.controldestock.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.udg.controldestock.models.product;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface productRepository extends CrudRepository<product, Long> {


    public Optional<product> findByName(String name);
}
