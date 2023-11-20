package com.project.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.entity.OrderDetail;
import com.project.entity.Product;




public interface OrderDetailDAO extends JpaRepository<OrderDetail, Long>{
	void deleteByProduct(Product product);

}
