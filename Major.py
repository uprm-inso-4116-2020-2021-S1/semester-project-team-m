class Major:


    def __init__(self, major: str):
        self.major = major
        self.major_specs()
        self.offers = ["CIIC", "INSO"]

    def major_specs(self):

        if self.offers.contains(self.major):

            def redirect(value):

                if value is self.offers[0]:
                    self.setup(major=self.offers[0])
                else:
                    self.setup(major=self.offers[1])

            redirect(self.major)

        else:
            return "Major Not Supported"

    def setup(self, major=None):

        if major is None:
            return

        if major is self.offers[0]:
            self.program = "Computer Science and Engineering"
            self.credits = 155
            self.courses = dict()

        elif major is self.offers[1]:
            self.program = "Software Engineering"
            self.credits = 155
            self.courses = dict()







