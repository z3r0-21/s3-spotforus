package nl.fontys.s3.spotforus.enums;

public enum CalendarTaskType {
    BATHROOM("Clean the bathroom."),
    KITCHEN("Clean the kitchen."),
    OTHER_ROOM("Clean other room(s)."),
    TRASH("Take out the trash.");

    public final String label;

    CalendarTaskType(String label) {
        this.label = label;
    }
}
