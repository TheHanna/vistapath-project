# VistaPath - Medical Lab Workflow System

## Requirements

* [Node.js/npm](https://nodejs.org)
* A desktop browser of your choice

## Usage

To start the app, simply run the following two command in your terminal of choice:

```bash
$ npm install
$ npm start
```

This will start the development server at http://localhost:3000

### Opening a new Case

Use the Open New Case button to open a new case

![New case button shown](docs/images/screen_001.png "Opening a new case")


## Goal

Design a visually appealing and user-friendly medical lab workflow system.

## Description

The system shall provide a user interface, whereby a user can:

* initiate a case analysis workflow by creating a new case
* upload images
* annotate uploaded images
* provide general notes about the case

Cases must proceed through 3-5 statuses:

* Opened
* Submitted
* Updated
* Approved
* Rejected

The user interface should provide a way to:

* view all currently created cases
* filter them by their status
* view and edit case details

## Flows

### Primary

```
Opened -> Submitted -> Approved
```

### Optional

```
Opened -> Submitted -> Rejected -> Updated -> Approved
```

## Status Descriptions and Logic

### Opened

* Cases start in the Opened status.
* Cases in the Opened status can be moved to the Submitted status.

### Submitted

* Cases in the Submitted status can be moved to the Approved or Rejected statuses

### Updated

* Cases in the Updated status can be moved to the Approved or Rejected statuses

### Approved

* Cases in the Approved status cannot have their details edited

### Rejected

* Cases in the Rejected status can be moved to the Updated status
