package com.todo.app.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Todo {

	private long id;
	private String title;
	private int done_flg;
	private String time_limit;

}
