package com.todo.app.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Todo {

	private long id;
	private String task;
	private String due;
	private int done;
	private int priority;
	private String refs;
	private int till_today;
	private String done_date;

}
