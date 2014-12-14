package com.deniz.useradmin.service.authorization;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.deniz.role.business.AppRoleInteractionsService;
import com.deniz.role.business.domain.AppRoleDto;

public class AuthorizationProcessController extends MultiActionController {

	private AppRoleInteractionsService roleInteractionsService;

	public void setRoleInteractionsService(AppRoleInteractionsService roleInteractionsService) {
		this.roleInteractionsService = roleInteractionsService;
	}

	public ModelAndView init(HttpServletRequest request, HttpServletResponse response) throws JSONException {
		PrintWriter out = setWriterAsResponse(response);
		String username = request.getParameter("username");
		String domain = request.getParameter("domain");
		username = "sysadmin";
		domain = "flightinformation";

		JSONObject responseJson = new JSONObject();
		JSONArray rolesArrayJson = new JSONArray();

		List<AppRoleDto> userRoles = roleInteractionsService.getUserRoles(domain, username);

		if (userRoles != null) {
			for (int i = 0; i < userRoles.size(); i++) {
				AppRoleDto appRoleDto = userRoles.get(i);
				rolesArrayJson.put(appRoleDto.getRoleNameMeta().getValue());
			}
			responseJson.put("roles", rolesArrayJson);
		}
		out.write(responseJson.toString());
		out.flush();
		return null;
	}

	private PrintWriter setWriterAsResponse(HttpServletResponse response) {
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return out;
	}
}
