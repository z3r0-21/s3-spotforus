package nl.fontys.s3.spotforus.enums;

public enum CalendarTaskType {
    BATHROOM("Clean the bathroom."),
    TOILET("Clean the toilet."),
    kitchen("Clean the kitchen."),
    LIVING_ROOM("Clean the living room."),
    TRASH("Take out the trash.");

    public final String label;

    CalendarTaskType(String label) {
        this.label = label;
    }
}
