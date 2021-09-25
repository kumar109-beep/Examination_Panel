from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
# from ..models.credentialModel import *
from ..serializers.credentialSerializers import *
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from ..models.adminProfileManagementModel import *
from rest_framework.pagination import PageNumberPagination


#Custom Import
from ..serializers.studentManagementSerializers import *
from .helper.dataRenderFunction import *
from ..serializers.adminProfileManagementSerializers import *
from ..serializers.resourceManagementSerializers import *


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        userID = User.objects.latest('id')
        adminDataCreate = Profile(refrence_user = userID).save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


'''

{
    "username": "admin",
    "email": "admin@bot.com",
    "password": "Password@123"
}


'''


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        dataAdmin = UserSerializer(user).data
        
        try:
            referAdmin = Profile.objects.get(refrence_user=dataAdmin['id'])
            dataStudent = GETAdminProfileManagementSerializer(referAdmin)
            return Response({
                "user": dataStudent.data,
                'type_of_user':"admin",
                "token": AuthToken.objects.create(user)[1]
                })
        except Profile.DoesNotExist:
            try:
                referAdmin = ResourceManagement.objects.get(referUser=dataAdmin['id'])
                dataStudent = GetResourceManagementSerializer(referAdmin)
                return Response({
                    "user": dataStudent.data,
                    'type_of_user':"resource",
                    "token": AuthToken.objects.create(user)[1]
                    })
                
            except Profile.DoesNotExist:
                return Response({'msg':"Contact to your admin"})
       
        



class studentLoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        if request.data['isStudent'] == 'yes':
            serializer = AuthTokenSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data['user']
                login(request, user)
                data = UserSerializer(user).data
                referStudent = StudentManagement.objects.get(referUser=data['id'])
                dataStudent = GETStudentManagementSerializer(referStudent)
                return Response(
                    {
                        "data": dataStudent.data,"token": AuthToken.objects.create(user)[1],
                        'message':"success",
                        'type_of_user':"student",
                         "status":True
                    })
            else:
                return Response({"data":{},'status':False,"message":"Provide Correct Username or Password"})
        else:
             return Response({"data":{},'status':False,"message":"Provide Correct Username or Password"})



class resourceLoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        if request.data['isResource'] == 'yes':
            # print()
            serializer = AuthTokenSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data['user']
                login(request, user)
                # exit()
                data = UserSerializer(user).data
                referStudent = ResourceManagement.objects.get(referUser=data['id'])
                data = GetResourceManagementSerializer(referStudent)
                # exit()
                # dataStudent = ResourceDataRender(referStudent)
                # print('jbhkjbjb',referStudent)
                # exit()
                return Response({
                    "user": data.data,
                    'type_of_user':"resource",
                    "token": AuthToken.objects.create(user)[1]
                    })
            else:
                return Response({'status':"false","user":"provide correct credential"})
        else:
             return Response({'message':"You are not correct user"})

       

    


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # email_plaintext_messagess = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    email_plaintext_message = "{}?token={}".format(
        'http://localhost:5000/reset-your-password/', reset_password_token.key)
    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "aditya.18pixels@gmail.com",
        # to:
        [reset_password_token.user.email]
    )
