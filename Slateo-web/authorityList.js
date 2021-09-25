
// =============================================================================================================================================
//                                                 SELECT ALL AUTHORITIES AT ONCE
// =============================================================================================================================================


$(document).ready(function () {
     var tokenKey = $('#hiddenTokenKey').val();
     var currentUrl = window.location.href;
        var filterUrl = currentUrl.split('/');
        var id = filterUrl[filterUrl.length - 1];
      var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + tokenKey + "");
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://13.233.247.133/api/role_detail/" + id + "/",requestOptions)
            .then(response => response.text())
            .then(result => {
                data = JSON.parse(result);
                var assign = eval(data['assign_authority']);
                $('input[type="checkbox"]').each(function () {
                    for (var k = 0; k < assign.length; k++) {
                        if (assign[k].trim() == $(this).val().trim()) {
                            $(this).prop('checked', true)
                         } 
                    }
                    });
            }
            )
            .catch(error => console.log('error', error));
   
})



function SelectAll_Authorities(txt) {
    var data = localStorage.getItem("authData");
    if (data == null) {
        var auhorityList = '';
        var checked = $(txt).parent().children('input[type="checkbox"]').is(':checked');
        checked == true ? $(txt).parent().children('input[type="checkbox"]').prop('checked', false) : $(txt).parent().children('input[type="checkbox"]').prop('checked', true);
        var flag = $(txt).parent().children('input[type="checkbox"]').is(':checked');
        if (flag) {
            var text = $(txt).text();
            if (auhorityList == '') {
                localStorage.setItem("authData", text.trim());
            }
            else {
                auhorityList = auhorityList + '|' + text.trim();
                localStorage.setItem("authData", text.trim());
            }
        
        } else {
            alert('AS' + data)
        }
    }
    else {
        var checked = $(txt).parent().children('input[type="checkbox"]').is(':checked');
        checked == true ? $(txt).parent().children('input[type="checkbox"]').prop('checked', false) : $(txt).parent().children('input[type="checkbox"]').prop('checked', true);
        var flag = $(txt).parent().children('input[type="checkbox"]').is(':checked');
        if (flag) {
            var text = $(txt).text();
            if (data == '') {
                localStorage.setItem("authData", text.trim());
            }
            else {
                data = data + '|' + text.trim();
                
                localStorage.setItem("authData", data);
            }
        
        } else {
            var dadaList = data.split('|')
            var NewList = '';
            for (var i = 0; i < dadaList.length; i++) {
                if ($(txt).text().trim() != dadaList[i].trim())
                    if (NewList == '') {
                        NewList = dadaList[i];
                    }
                    else {
                        NewList = NewList + '|' + dadaList[i]
                    }
                    
                }
            localStorage.setItem("authData", NewList);
        }
    }

}
// =============================================================================================================================================
//                                                 SHOW SELECTED AUTHORITIES ON MERGING WITH ROLES
// =============================================================================================================================================
function submitAuthority() {
    var dataText = '';
    $('input[type="checkbox"]').each(function () {
        if (this.checked) {
            var text_data = $(this).val();
            if (dataText == '') {
                dataText = text_data.trim();
            }
            else {
                dataText = dataText + '|' + text_data.trim();
            }
        }
       
    });
    if (dataText == '') {
        alert("Please Select AtLeast One Authority");
        // return false;
    }
    else {
        var authDataList = dataText.split('|');
        var tokenKey = $('#hiddenTokenKey').val();
        var currentUrl = window.location.href;
        var filterUrl = currentUrl.split('/');
        var id = filterUrl[filterUrl.length - 1];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + tokenKey + "");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"assign_authority": authDataList});
        console.log(raw);
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://13.233.247.133/api/role_detail/" + id + "/", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.reload();
             }
                
            )
            .catch(error => console.log('error', error));
        }
   
}






// =============================================================================================================================================
//                                             PREVIEW AUTHORITY WITH SELECTED ROLES/DESIGNATION
// =============================================================================================================================================
function getAuthorityWithRole(){
    var x = $('.filter-option-inner-inner').text();
    var roleID = $('#selectedRoles').val();
    var splitedData = x.split(',')
    console.log(splitedData, roleID);
    var authData = localStorage.setItem('roleID', roleID);
    var authID = []

    // return false;
    if (splitedData[0] == 'Nothing selected'){
        splitedData.pop();
    }
    var authData = localStorage.getItem('authData');
    var authDataList = authData.split(',,');
    var splitData = []
    for(var i=0;i<authDataList.length;i++){
        splitData.push(authDataList[i].split(','));
    }
    roleWithauthString = '';
    for (var i = 0; i < splitData.length;i++){
        str = '<tr>\
                <td style = "display:none;">'+ splitData[i][0] +'</td>\
                <td>'+ splitData[i][2]+'</td>\
                <td>'+ splitedData +'</td>\
                </tr>';
        roleWithauthString = roleWithauthString + str;
        authID.push(splitData[i][0])
    }
    var authData = localStorage.setItem('authID', authID);
    $('#assignedRoleAndAuthority').html('');
    $('#assignedRoleAndAuthority').append(roleWithauthString);
}
// =============================================================================================================================================
//                                        UNSELECTING ALL CHECKBOXES & DELETING THE LOCALSTORAGE KEY
// =============================================================================================================================================
function submitAuthData(){
    var authID = localStorage.getItem('authID');
    var roleID = localStorage.getItem('roleID');
    // -----------------------------------------------------------------------------
    var tokenKey = $('#hiddenTokenKey').text();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + tokenKey + "");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "role_designation_fk_ID": roleID.split(','), "authority_fk_ID": authID.split(',')});
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://13.233.247.133/api/assignRoleToAuthority_list/", requestOptions)
        .then(response => response.text())
        .then(result => window.location.href = '/authority_list')
        .catch(error => console.log('error', error));




    // -----------------------------------------------------------------------------
    $('#sel_users input').each(function () {
        $(this).prop('checked', false);
    });
    $('#sel_master input').prop('checked', false);
    localStorage.removeItem("authData");
    localStorage.removeItem("authData");

}
// =============================================================================================================================================
// =============================================================================================================================================