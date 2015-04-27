# /year

Get data by year.

## /year/:id

Example usage:

`curl -i http://educationdata.nz/api/year/1999`

### Parameter

| Field | Type | Description |
| ----- | ---- | ----------- |
| id | String | The year you want data for e.g. '1999' |

### Success 200

```json
{
    "schools": [{
        "id": "2",
        "name": "Taipa Area School",
        "subjects": {
            "Computer related studies": null,
            "Computer studies": null,
            "Craft / Technicraft / Workshop Craft": null,
            "Design, Drawing and Graphics": 5,
            "Design / Graphics related studies": null,
            "Graphics": 89,
            "Home Economics Textiles and Clothing (F6)": null,
            "Info. & Communication Tech": 58,
            "Metalwork": null,
            "Technology": 58,
            "Text and Information Management": 120,
            "Textiles / Clothing": 7,
            "Typing": null,
            "Woodwork": null,
            "Workshop Technology": 80
        }
    }]
}
```
