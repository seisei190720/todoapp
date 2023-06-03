package com.todo.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todo.app.entity.Todo;
import com.todo.app.mapper.TodoMapper;

@Controller
public class AjaxController {

	@Autowired
	TodoMapper todoMapper;
	private static final long TILL_TODAY = 1;
	private static final long TILL_AFTER_TOMORROW = 0;
	private static final long DONE = 1;
	private static final long UNDONE = 0;

	@RequestMapping(value = "/tasks")
	@ResponseBody
	public List<Todo> selectAll(Model model) {
		List<Todo> list = todoMapper.selectAll();
		System.out.println(list);
		List<Todo> responseData = new ArrayList<>();
		responseData.add(Todo.builder().task("レビューのTODOを消化する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("カレンダーにレビューの予定を追加する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("実装の進捗を報告する").done(0).due("2303-04-23").build());
		responseData.add(Todo.builder().task("Redmineのstatusを更新する").done(0).due("2303-04-23").build());
		return list;
	}

	@PostMapping(value = "/task/add")
	@ResponseBody
	public Todo addTask(@RequestBody Todo body) {
		todoMapper.add(body);
		return todoMapper.selectLatestTask();
	}
	
	@PutMapping(value = "/task/{todoId}/till-today")
	@ResponseBody
	public List<Todo> setToTillToday(@PathVariable("todoId") long todoId) {
		todoMapper.updateTillToday(todoId, TILL_TODAY);
		return todoMapper.selectAll();
	}
	
	@PutMapping(value = "/task/{todoId}/till-after-tomorrow")
	@ResponseBody
	public List<Todo> updateToTillToday(@PathVariable("todoId") long todoId) {
		todoMapper.updateTillToday(todoId, TILL_AFTER_TOMORROW);
		return todoMapper.selectAll();
	}
	
	@PutMapping(value = "/task/{todoId}/done")
	@ResponseBody
	public List<Todo> setToDone(@PathVariable("todoId") long todoId) {
		todoMapper.updateDone(todoId, DONE, TILL_AFTER_TOMORROW);
		return todoMapper.selectAll();
	}
	
	@PutMapping(value = "/task/{todoId}/undone")
	@ResponseBody
	public List<Todo> setToUndone(@PathVariable("todoId") long todoId) {
		todoMapper.updateDone(todoId, UNDONE, TILL_AFTER_TOMORROW);
		return todoMapper.selectAll();
	}
	
	@DeleteMapping(value="/task/delete/{todoId}")
	@ResponseBody
	public void delete(@PathVariable("todoId") long todoId) {
		todoMapper.delete(todoId);
	}
}
