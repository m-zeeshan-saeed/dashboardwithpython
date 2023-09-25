from . views import RegistrationView,usernameValidationView,emailValidationView, verificationView
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

urlpatterns =[
 path('register',RegistrationView.as_view(), name='register'),
 path('validate-username',csrf_exempt(usernameValidationView.as_view()), name='validate-username'),
 path('validate-email',csrf_exempt(emailValidationView.as_view()),name='validate_email'),
 path('activate/<uidb64>/<token>', verificationView.as_view(),name="activate")
]
