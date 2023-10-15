class Task {

    constructor(action = "NA", id, startDate, endDate, monthYear, excludedDate, noOfDays, leadCount, expectedDrr, lastUpdated) {

        this.action = action;
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.monthYear = monthYear;
        this.excludedDate = excludedDate;
        this.noOfDays = noOfDays;
        this.leadCount = leadCount;
        this.expectedDrr = expectedDrr;
        this.lastUpdated = lastUpdated;
        this.markForDelete = false;
    }

    toggle(){

        this.markForDelete = !this.markForDelete;
    }

}