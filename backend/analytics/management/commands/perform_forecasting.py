import pandas as pd
from django.db.models import Count
from django.core.management.base import BaseCommand
from prophet import Prophet
from turfapp.models import Booking
from django.utils import timezone


class Command(BaseCommand):
    help = 'Perform occupancy forecasting for turf bookings'

    def handle(self, *args, **kwargs):
        # Fetch historical booking data
        data = Booking.objects.filter(status='Confirmed').values('date').annotate(bookings=Count('id')).order_by('date')
        df = pd.DataFrame(data)
        
        if df.empty:
            self.stdout.write(self.style.WARNING('No booking data available for forecasting.'))
            return

        df['date'] = pd.to_datetime(df['date'])
        df = df.rename(columns={'date': 'ds', 'bookings': 'y'})

        # Initialize and fit the Prophet model
        model = Prophet()
        model.fit(df)

        # Create a dataframe for future dates
        future = model.make_future_dataframe(periods=30)  # Forecast for the next 30 days
        forecast = model.predict(future)

        # Save forecast to a file or database if needed
        forecast.to_csv('forecast_results.csv', index=False)

        # Output success message
        self.stdout.write(self.style.SUCCESS('Occupancy forecasting completed and results saved to forecast_results.csv'))