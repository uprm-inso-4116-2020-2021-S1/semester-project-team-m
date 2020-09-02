class Major:
    offers := ["CIIC", "INSO"]

    def __init__(self, major: str):
        self.major = major
        self.major_specs()

    def major_specs(self):

        if offers.contains(self.major):

            def redirect(value):

                if value is offers[0]:
                    self.setup(major=offers[0])
                else:
                    self.setup(major=offers[1])

            redirect(self.major)

        else:
            return "Major Not Supported"

    def setup(self, major=None):

        if major = None:
            return

        if major is offers[0]:
            self.program = "Computer Science and Engineering"
            self.credits = 155
            self.courses = dict()

        elif major is offers[1]:
            self.program = "Software Engineering"
            self.credits = 155
            self.courses = dict()







