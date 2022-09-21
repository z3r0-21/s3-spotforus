package nl.fontys.s3.spotforus.enums;

public enum CalendarTaskType {
    bathroom("Clean the bathroom."),
    toilet("Clean the toilet."),
    kitchen("Clean the kitchen."),
    livingRoom("Clean the living room."),
    trash("Take out the trash.");

    public final String label;

    CalendarTaskType(String label) {
        this.label = label;
    }
}
