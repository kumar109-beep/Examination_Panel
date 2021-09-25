def getAuthToken(request):
    if request.session.has_key('auth_token'):
        auth_token_key = request.session['auth_token']
        print('auth_token_key : ',auth_token_key)
        return 'Token ' + auth_token_key 
    else:
        print('auth_token_key not avalaible1')
        return None