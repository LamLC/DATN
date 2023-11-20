package com.project.service;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.project.entity.Order;


public interface OrderService {


	Order create(JsonNode orderData);

	Order findById(Long id);

	List<Order> findByUsername(String username);
	List<Order> findByStatus(String status);

//	double getTotalPrice();

}
