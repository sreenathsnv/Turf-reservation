
from django.contrib.auth.models import BaseUserManager
from django.db import IntegrityError

class CustomUserManager(BaseUserManager):

    def create_user(self,email,username,password,**extra_fields):

        if not email:
            raise ValueError("email must be set")
        if not username:
            raise ValueError("username must be set and has to be unique")

        if len(password) < 8:
            raise ValueError("Password has to have atleast 8 characters")
        
        email = self.normalize_email(email)
        try:
            user = self.model(email = email,username= username,**extra_fields)
        except Exception as e:
            print(e)

        user.set_password(password)
        
        try:
            user.save(using=self._db)
        except IntegrityError:
            raise ValueError("A user with this email or username already exists.")

        return user
        

    def create_superuser(self,email,username,password,**extra_fields):

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        

        return self.create_user(email,username,password,**extra_fields)
    
