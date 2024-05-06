package org.udg.controldestock.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.udg.controldestock.models.product;
import org.udg.controldestock.services.productService;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class productController {
    @Autowired
    productService service;

    @PostMapping()
    public product saveProduct(@RequestBody product product){
        return service.saveProduct(product);
    }

    @PutMapping()
    public product editProduct(@RequestBody product product){
        return service.editProduct(product);
    }

    @GetMapping()
    public ArrayList<product> getAllProducts(){
        return service.getAllProducts();
    }

    @GetMapping("/findProductBy/{id}")
    public Optional<product> findProductById(@PathVariable Long id){
        return service.findProductById(id);
    }

    @GetMapping("/findProductByName/{name}")
    public Optional<product> findProductByName(@PathVariable String name){
        return service.findProductByName(name);
    }

    @DeleteMapping("/deleteProductById")
    public String deleteProductById(@RequestParam("id") Long id){
        return service.deleteProductById(id);
    }



}
