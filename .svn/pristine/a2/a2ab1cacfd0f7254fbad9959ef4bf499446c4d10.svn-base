package com.deniz.useradmin.framework.setup.impl;

import java.util.ArrayList;
import java.util.List;

import com.deniz.framework.persistence.enums.BooleanEnum;
import com.deniz.framework.setup.impl.AbstractSetupDataServiceImpl;
import com.deniz.role.business.AppRoleInteractionsService;
import com.deniz.role.business.domain.AppRoleDto;
import com.deniz.role.business.domain.AppRoleGroupDto;
import com.deniz.role.business.domain.AppUserDto;
import com.deniz.role.business.domain.AppUserGroupDto;


/**
 * Inserts setup data for application
 * @author deniz.yavas
 * 
 */
public class SetupDataServiceImpl extends AbstractSetupDataServiceImpl
{

	public AppRoleInteractionsService roleInteractionsService;


	public void setRoleInteractionsService( AppRoleInteractionsService roleInteractionsService )
	{
		this.roleInteractionsService = roleInteractionsService;
	}


	@Override
	public void insertData()
	{
		AppRoleGroupDto roleGroup = new AppRoleGroupDto();
		roleGroup.getRoleGroupNameMeta().setValue( "Flight Group" );
		roleInteractionsService.save( roleGroup );

		AppRoleGroupDto roleGroup2 = new AppRoleGroupDto();
		roleGroup2.getRoleGroupNameMeta().setValue( "Basedata Group" );
		roleInteractionsService.save( roleGroup2 );

		AppRoleGroupDto roleGroup3 = new AppRoleGroupDto();
		roleGroup3.getRoleGroupNameMeta().setValue( "*" );
		roleInteractionsService.save( roleGroup3 );

		AppRoleDto role = new AppRoleDto();
		role.getRoleNameMeta().setValue( "actualFlight/init" );
		role.getRoleGroupMeta().setValue( "Flight Group" );
		role.getDomainMeta().setValue( "flightinformation" );
		role.getLoginRequiredMeta().setValue( BooleanEnum.TRUE.name() );
		roleInteractionsService.save( role );

		AppRoleDto roleTemp = new AppRoleDto();
		roleTemp.getRoleNameMeta().setValue( "actualFlight/go" );
		roleTemp.getRoleGroupMeta().setValue( "Flight Group" );
		roleTemp.getDomainMeta().setValue( "flightinformation" );
		roleTemp.getLoginRequiredMeta().setValue( BooleanEnum.TRUE.name() );
		roleInteractionsService.save( roleTemp );

		AppRoleDto role2 = new AppRoleDto();
		role2.getRoleNameMeta().setValue( "airline/init" );
		role2.getRoleGroupMeta().setValue( "Basedata Group" );
		role2.getDomainMeta().setValue( "flightinformation" );
		role2.getLoginRequiredMeta().setValue( BooleanEnum.TRUE.name() );
		roleInteractionsService.save( role2 );


		addNoLoginRole("cos.templates");
		addNoLoginRole("dictionary");
		addNoLoginRole("profile");
		addNoLoginRole("cos.extras");
		addNoLoginRole("cos.modules");
		addNoLoginRole("cos.menu/init");
		addNoLoginRole("hotlinks");
		addNoLoginRole("news");
		addNoLoginRole("infoboxes");
		
		AppUserGroupDto userGroup = new AppUserGroupDto();
		userGroup.getUserGroupNameMeta().setValue( "Administrator" );
		ArrayList<String> roleGroupsList = new ArrayList<String>();
		roleGroupsList.add( "Flight Group" );
		roleGroupsList.add( "Basedata Group" );
		userGroup.getRoleGroupsMeta().setValueList( roleGroupsList );
		roleInteractionsService.save( userGroup );

		AppUserDto user = new AppUserDto();
		user.getUserNameMeta().setValue( "sysadmin" );
		user.getPasswordMeta().setValue( "123456" );
		List<String> userGroupsList = new ArrayList<String>();
		userGroupsList.add( "Administrator" );
		user.getUserGroupsMeta().setValueList( userGroupsList );
		roleInteractionsService.save( user );
	}


	private void addNoLoginRole(String role) {
		AppRoleDto role5 = new AppRoleDto();
		role5.getRoleNameMeta().setValue( role );
		role5.getRoleGroupMeta().setValue( "*" );
		role5.getDomainMeta().setValue( "*" );
		role5.getLoginRequiredMeta().setValue( BooleanEnum.FALSE.name() );
		roleInteractionsService.save( role5 );
	}

}