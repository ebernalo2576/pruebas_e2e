const assert = require("assert");

class MemberPage {
    membersMenuButton(driver) { return driver.$('[data-test-nav="members"]'); }
    memberListSelector(driver) { return driver.$('.gh-members-list-name'); }
    newMemberButton(driver) { return driver.$('a.gh-btn.gh-btn-primary'); }
    memberNameField(driver) { return driver.$('#member-name'); }
    memberEmailField(driver) { return driver.$('#member-email'); }
    saveMemberButton(driver) { return driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view'); }
    settingsMenuButton(driver) { return driver.$('button.gh-btn.gh-btn-icon.icon-only.gh-btn-action-icon.closed.ember-view'); }
    deleteMemberButton(driver) { return driver.$('[data-test-button="delete-member"]'); }
    confirmDeleteButton(driver) { return driver.$('.modal-footer .gh-btn-red'); }

    // Navigate to the members page
    async navigateToMembersPage(driver) {
        await driver.url("http://localhost:3001/ghost/#/members/new");

    }

    // Start creating a new member
    async startCreatingNewMember(driver) {
        await driver.url("http://localhost:3001/ghost/#/members/new");

    }
    async goBacktoMembersPage(driver) {
        await driver.url("http://localhost:3001/ghost/#/members");
    }

    // Enter member details (name and email)
    async enterMemberDetails(driver, name, email) {
        console.log(`Entering member details - Name: ${name}, Email: ${email}`);
        await this.memberNameField(driver).clearValue();
        await this.memberNameField(driver).setValue(name);
        await this.memberEmailField(driver).clearValue();
        await this.memberEmailField(driver).setValue(email);
    }

    // Save the member
    async saveMember(driver) {
        console.log("Saving the member...");
        await this.saveMemberButton(driver).click();
        await driver.pause(1000);
    }

    // Verify that a member with a specific name is visible in the members list
    async verifyMemberIsVisible(driver, name) {
        console.log(`Verifying that member with name "${name}" is visible in the list...`);
        await this.navigateToMembersPage(driver);
        const memberName = await this.memberListSelector(driver).getText();
        assert.strictEqual(memberName, name, `The member with name "${name}" was not found in the list.`);
        console.log(`Confirmed: Member with name "${name}" is visible.`);
    }

    // Select an existing member by name for editing or deletion
    async selectMemberByName(driver, name) {
        console.log(`Selecting member with name "${name}"...`);
        const memberName = await this.memberListSelector(driver).getText();
        if (memberName === name) {
            await this.memberListSelector(driver).click();
            await driver.pause(1000);
            console.log(`Member "${name}" found and selected.`);
            return;
        }
        throw new Error(`Member with name "${name}" not found in the list.`);
    }

    // Edit member details (name and email)
    async editMemberDetails(driver, newName, newEmail) {
        console.log(`Editing member details to - Name: ${newName}, Email: ${newEmail}`);
        await this.memberNameField(driver).clearValue();
        await this.memberNameField(driver).setValue(newName);
        await this.memberEmailField(driver).clearValue();
        await this.memberEmailField(driver).setValue(newEmail);
    }

    // Delete a member
    async deleteMember(driver) {
        console.log("Deleting the member...");
        await this.settingsMenuButton(driver).click();
        await this.deleteMemberButton(driver).click();
        await this.confirmDeleteButton(driver).click();
        await driver.pause(1000);
        console.log("Member deleted.");
    }

    // Verify that a member with a specific name is not visible in the members list
    async verifyMemberNotInList(driver, name) {
        console.log(`Verifying that member with name "${name}" is not in the list...`);
        await this.navigateToMembersPage(driver);
        const memberName = await this.memberListSelector(driver).getText();
        assert.notStrictEqual(memberName, name, `The member with name "${name}" is still visible in the list.`);
        console.log(`Confirmed: Member with name "${name}" is not in the list.`);
    }
}

module.exports = new MemberPage();
