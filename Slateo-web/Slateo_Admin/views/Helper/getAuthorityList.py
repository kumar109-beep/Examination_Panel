

def get_authority_list(list_auth,userType):
    if userType == 'resource_login':
        values = ["True"] * len(list_auth)
        dictionary = dict(zip(list_auth, values))
        return dictionary
    else:
        dictionary = {"admin":'18pixels@admin'}
        return dictionary