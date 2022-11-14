import os
import sys

def module_path():
    base_url = os.environ.get('DATABASE_TYPE') + ':///'
    next_path = os.path.join(os.getcwd(), os.environ.get('DATABASE_NAME'))
    return base_url + next_path