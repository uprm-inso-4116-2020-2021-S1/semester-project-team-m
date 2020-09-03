import re
"""
self.user_roles should be an enum {student, develop, guest}
"""

class User:

    def __init__(self):
        self.name = None
        self.student_id_number = None
        self.password = None
        self.user_role = str()

    """
    Attribute: Username
    """
    def user_name(self, first=None, paternal = None, maternal = None):

        if (self.first_name, self.last_name) is None and (first, paternal, maternal) is not None:
            self.first_name = first
            self.last_name = paternal + " " + maternal

        return self.first_name + " " + self.last_name

    """
    Attribute: User Role
    """
    def user_role(self):
        if self.student_id_number.isnumeric():
            self.user_role = "Student"
        else:
            self.user_role = "Undefined"

        return self.user_role


    """
    Attribute
    """
    def password(self, enter=None, change=False):
        if self.password is None:
            new_input = input("Enter password \n")
            verify = input("Verify Password \n")
            if new_input != verify:
                self.password()

        if change is True and enter is not None:
            verify = input("Verify Password \n")
            if verify is not self.password:
                return "Invalid"


class Student(User):

    def __init__(self):
        super(User, self).__init__(self)
        self.student_id_number = int()

    """
        Attribute: Student ID Number
    """

    def student_number(self, value=None):
        """
        if there isn't a recorded student id number and the function doesn't receive one
        it will return an str saying that there isn't one.
        """
        """
        else if there's no student id number but the function recieves an argument
        if it meets criteria it will replace it and return the new id number

        if not it wil return the function sending a string that informs that there isn't a valid id number
        """
        """
        if it doesn't recieves a parameter and there's already a valid student id number it will return it
        """
        if self.student_id_number is None and value is None:
            return "No Student ID number"
        elif len(str(value)) is 9:
            if value.isnumeric() is False:
                return self.student_number(value=None)
            if value[0:3] is "802":
                self.student_id_number = value
                return self.student_id_number
        else:
            return self.student_id_number

    """
    Attribute: Student Admission Year
    """

    def get_admission_year(self) -> int:
        if self.student_number().isnumeric() is False:
            return self.student_number()
        else:
            year = self.student_number()[3:5]

        return year


class Developer(User):

    def __init__(self):
        super(User, self).__init__()
        """
        All developers have admin privileges
        """
        self.privileges = True

    def admin_pass_change(self, target: User):
        if self.privileges:
            """
            For proof of concept, not for real world use. Not safe
            """
            target.password = None




