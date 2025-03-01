export const environment = {
    HINT_FIVE_TEXT: "Replace the URL query param with ?agencyNumber=' or 1=1--\n\nThe trick is the first single quote will escape the SQL query running on the server, then the 1=1 adds a second condtion to the where clause and will match all records, then the -- will comment out the rest of the SQL query that would have ran."
}