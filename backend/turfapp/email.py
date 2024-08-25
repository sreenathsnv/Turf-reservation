from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = 'activation_email.html'


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'password_reset.html'