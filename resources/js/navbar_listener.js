/*최초에 JS파일이 로딩될 때 1번만 발생*/
$(document).ready(function() {
	
	navItemHome 		= $('#id_navitem_home');
	navItemPreferences 	= $('#id_navitem_preferences');
	navItemInputPath 	= $('#id_navitem_input_path');
	navItemIrGen 		= $('#id_navitem_ir_gen');
	//navItemFinish 		= $('#id_navitem_finish'); // 완료 nav menu 삭제
	progressBar			= document.getElementById('id_progerss_bar');
	
	navLinkHome 		= $('#id_navlink_home');
	navLinkPreferences 	= $('#id_navlink_preferences');
	navLinkInputPath 	= $('#id_navlink_input_path');
	navLinkIrGen 		= $('#id_navlink_ir_gen');
	//navLinkFinish 		= $('#id_navlink_finish'); // 완료 nav menu 삭제
	btnIrgStart 		= $('#id_irg_start_btn');
	btnIrGen 			= $('#id_next_to_irGen_btn');
	btnBackToStart 		= $('#id_back_to_start_btn');
	
	navItemStr 			= 'nav-item';
	navItemActiveStr 	= 'nav-item active';
	progressBarStyle	= 'style';
	progressBarWidth	= 'width: ';
	progressBarPercent	= '%';
	
	navLinkHome.click(function(){
		markNavHomeActive();
	});
	
	navLinkPreferences.click(function(){
		markNavPreferenceActive();
	});

	navLinkInputPath.click(function(){
		markNavInputPathActive();
	});
	
	navLinkIrGen.click(function(){
		markNavIrGenActive();
	});

	/* 완료 nav menu 삭제
	navLinkFinish.click(function(){
		markNavFinishActive();
	});		
	*/
	
	btnIrgStart.click(function(){
		markNavPreferenceActive();	
	});
	
	btnIrGen.click(function(){
		markNavIrGenActive();
	});
	
	btnBackToStart.click(function(){
		markNavHomeActive();
	});

});

function markNavHomeActive(){
	clearAllNavActivation();
	navItemHome.removeClass(navItemStr);
	navItemHome.addClass(navItemActiveStr);				
	progressBar.setAttribute(progressBarStyle, progressBarWidth + '25' + progressBarPercent);
}

function markNavPreferenceActive(){
		clearAllNavActivation();
		navItemPreferences.removeClass(navItemStr);
		navItemPreferences.addClass(navItemActiveStr);	
		progressBar.setAttribute(progressBarStyle, progressBarWidth + '50' + progressBarPercent);
}

function markNavInputPathActive(){
		clearAllNavActivation();
		navItemInputPath.removeClass(navItemStr);
		navItemInputPath.addClass(navItemActiveStr);	
		progressBar.setAttribute(progressBarStyle, progressBarWidth + '75' + progressBarPercent);
}

function markNavIrGenActive(){
		clearAllNavActivation();
		navItemIrGen.removeClass(navItemStr);
		navItemIrGen.addClass(navItemActiveStr);	
		progressBar.setAttribute(progressBarStyle, progressBarWidth + '100' + progressBarPercent);
}

/* 완료 nav menu 삭제
function markNavFinishActive(){
		clearAllNavActivation();
		navItemFinish.removeClass(navItemStr);
		navItemFinish.addClass(navItemActiveStr);	
		progressBar.setAttribute(progressBarStyle, progressBarWidth + '100' + progressBarPercent);
}
*/

function clearAllNavActivation(){
	if(navItemHome.hasClass(navItemActiveStr)){
		navItemHome.removeClass(navItemActiveStr);	
		navItemHome.addClass(navItemStr);				
	}
	
	if(navItemPreferences.hasClass(navItemActiveStr)){
		navItemPreferences.removeClass(navItemActiveStr);	
		navItemPreferences.addClass(navItemStr);				
	}

	if(navItemInputPath.hasClass(navItemActiveStr)){
		navItemInputPath.removeClass(navItemActiveStr);	
		navItemInputPath.addClass(navItemStr);				
	}

	if(navItemIrGen.hasClass(navItemActiveStr)){
		navItemIrGen.removeClass(navItemActiveStr);	
		navItemIrGen.addClass(navItemStr);				
	}

	/* 완료 nav menu 삭제
	if(navItemFinish.hasClass(navItemActiveStr)){
		navItemFinish.removeClass(navItemActiveStr);	
		navItemFinish.addClass(navItemStr);				
	}
	*/	
}