package org.udg.controldestock.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.udg.controldestock.models.product;
import org.udg.controldestock.repositories.productRepository;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class productService {

    @Autowired
    productRepository repository;

    public product saveProduct(product product){

        String name = product.getName();
        if(repository.findByName(name).isEmpty()){
            return repository.save(product);
        }else{
            product Product = new product();
            Product.setId(-1L);
            return Product;
        }

    }


    public ArrayList<product> getAllProducts(){
        return (ArrayList<product>) repository.findAll();
    }

    public Optional<product> findProductById(Long id){
        return repository.findById(id);
    }

    public Optional<product> findProductByName(String name){
        return repository.findByName(name);
    }

    public product editProduct(product Product){
        return repository.save(Product);
    }

    public String deleteProductById(Long id){
        if(findProductById(id).isPresent()){
            repository.deleteById(id);
            return "Product deleted";
        }else{
            return "Product with id: " + id + " not found";
        }
    }

}
