package org.udg.controldestock.models;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;
    private String description;
    private String name;
    private Integer quantity;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String descripcion) {
        this.description = descripcion;
    }

    public String getName() {
        return name;
    }

    public void setName(String nombre) {
        this.name = nombre;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer cantidad) {
        this.quantity = cantidad;
    }

//    @Override
//    public String toString() {
//
//        return String.format("{Id: %s, nombre: %s, descripcion: %s, cantidad: %d}", this.id, this.name, this.description, this.quantity);
//    }
}
