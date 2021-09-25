from django.apps import AppConfig


class SaletoappConfig(AppConfig):
    name = 'saletoApp'
    def ready(self):
        import saletoApp.signals
