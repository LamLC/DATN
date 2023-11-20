package com.project.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entity.Account;



public interface AccountDAO extends JpaRepository<Account, String>{
	@Query("SELECT DISTINCT ar.account FROM Authority ar WHERE ar.role.id IN ('DIRE','STAF','CUST')")
	List<Account> getAdministrators();
	@Query("SELECT DISTINCT ar.account FROM Authority ar WHERE ar.role.id IN ('CUST')")
	List<Account> getCust();
	@Query("SELECT DISTINCT ar.account FROM Authority ar WHERE ar.role.id IN ('STAF')")
	List<Account> getstaf();
	@Query("SELECT o.email FROM Account o ")
	List<Account> findByEmail();
//	@Query("SELECT o FROM Account o")
//	List<Account> findAccount();
//	Optional<Account> findById2(String username, String email, String fullname);
	Optional<Account> findByUsername(String username);
	@Query("SELECT o FROM Account o WHERE o.username=?1")
	List<Account> findAccountByUsername(String username);
//	@Query("INSERT INTO o.account VALUES (?, ?, ?)")
//	List<Account> saveRegistration();
	
//	@Query ("SELECT o.fullname , o.phone FORM Account o WHERE o.username.id = ?1")
//	List<Account> findFullnameAndPhone(String username);
}