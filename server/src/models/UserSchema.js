import mongoose from "mongoose";


// let UserSchema = mongoose.Schema({
//     userName : String,
//     userEmail : String,
//     userMobile : Number,
//     userRole : String
// })

// export const User = mongoose.model(`User`, UserSchema)

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        uppercase: true,
        trim: true
    },
    country: {
        type: String,
        default: "India",
        immutable: true
    },
    postalCode: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    // BASIC INFO
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return value.includes("@") && value.includes(".");
            },
            message: "Email must contain @ and ."
        }
    },
//    mobileNumber: {
//   type: String,
//   required: true,
//   unique: true,
//   trim: true,
//   match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"]
// },

    // AUTH
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },

    // PROFILE
    age: {
        type: Number,
        min: 13,
        max: 120
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },

    // BOOLEAN
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // DATE
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function (value) {
                return value < new Date();
            },
            message: "DOB must be in the past"
        }
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },

    // ARRAY
    // skills: {
    //     type: [String],
    //     validate: {
    //         validator: function (arr) {
    //             return arr.length <= 10;
    //         },
    //         message: "Max 10 skills allowed"
    //     }
    // },

    // NESTED OBJECT
    address: addressSchema,

    // MIXED OBJECT
    preferences: {
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light"
        },
        notifications: {
            type: Boolean,
            default: true
        }
    },

    // NUMERIC FIELD
    // accountBalance: {
    //     type: Number,
    //     min: 0,
    //     default: 0
    // },

    // CONDITIONAL VALIDATION
    // companyName: {
    //     type: String,
    //     validate: {
    //         validator: function (value) {
    //             if (this.accountType === "business") {
    //                 return !!value;
    //             }
    //             return true;
    //         },
    //         message: "Company name is required for business accounts"
    //     }
    // },

    // accountType: {
    //     type: String,
    //     enum: ["personal", "business"],
    //     default: "personal"
    // }

}, {
    timestamps: true,   // createdAt, updatedAt
    versionKey: "__v"   // versioning
});

// INDEXES
// userSchema.index({ email: 1 });
userSchema.index({ accountType: 1 });

// EXPORT
export const User = mongoose.model("User", userSchema);


