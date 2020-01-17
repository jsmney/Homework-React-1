/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import Root from '../src/components/Root';
import DeletePet from '../src/components/DeletePet';
import { mockAxios } from './setup';

const deleteRequests = () => mockAxios.history.delete;

/**
 * Tier 4 is about
 * - handling a click event from a button
 * - sending a delete request to the server
 * - synchronizing client-side state with the server
 */

/** Instructions:
 * Edit the DeleteButton component in src/components/DeleteButton.js
 * Add a click handler to the button
 * In the click handler, send a DELETE request to /api/pets/ID
 * NOTE: DeletePet will be passed petId and handleDelete as a prop
 * After the server confirms the successful deletion, call handleDelete
 *
 * Edit the Root component in src/components/Root.js
 * Add a handleDelete function to Root (it can be empty for now)
 * Pass handleDelete to DeletePet (through PetList and each SinglePet)
 * Root's handleDelete function should do one of two things:
 *   1. Re-fetch the data from the server (e.g. GET /api/pets)
 *   2. Remove the deleted pet from state (without making a network request)
 * If it all works correctly, you should be able to click "Delete" and the pet
 * will disappear from the list.
 */

describe('Tier 4: DeletePet component', () => {
  afterEach(() => mockAxios.reset());

  it("renders a 'Delete' button", () => {
    const wrapper = mount(<DeletePet petId={1} handleDelete={() => {}} />);

    expect(wrapper.find('button')).to.have.lengthOf(1);
    expect(
      wrapper.containsMatchingElement(
        <button className="delete-button">Delete</button>
      )
    ).to.equal(true);
  });

  it('sends a delete request to /api/pets/:petId when user clicks the button', async () => {
    mockAxios.onDelete('/api/pets/1').reply(204);
    const wrapper = mount(<DeletePet petId={1} handleDelete={() => {}} />);

    expect(deleteRequests()).to.have.lengthOf(0);

    wrapper.simulate('click');

    await waitForExpect(() => {
      expect(deleteRequests()).to.have.lengthOf(1);
    });
  });

  it('calls props.handleDelete if the delete request is successful', async () => {
    mockAxios.onDelete('/api/pets/2').reply(204);
    const handleDeleteSpy = spy();
    const wrapper = mount(
      <DeletePet petId={2} handleDelete={handleDeleteSpy} />
    );

    wrapper.simulate('click');

    await waitForExpect(() => {
      expect(handleDeleteSpy.called).to.equal(true);
    });
  });

  it('does not call props.handleDelete if the delete request fails', async () => {
    mockAxios.onDelete('/api/pets/3').reply(500);
    const handleDeleteSpy = spy();
    const wrapper = mount(
      <DeletePet petId={3} handleDelete={handleDeleteSpy} />
    );

    wrapper.simulate('click');

    await waitForExpect(() => {
      expect(handleDeleteSpy.called).to.equal(false);
    });
  });

  // There's quite a lot going on in this test! Read the comments carefully to
  // get a solid grasp on what's going on.
  it('removes the deleted pet', async () => {
    const samplePets = [
      {
        id: 1,
        name: 'Rigatoni',
        description: 'A flaming hot cheetoh in feline form',
        species: 'cat',
      },
      {
        id: 2,
        name: 'Cody',
        description: 'Adorable pug who loves to hug',
        species: 'dog',
      },
    ];
    // For this test, we'll have to manipulate how mockAxios respondes to
    // requests. The first time you make a GET request to /api/pets, you'll get
    // both sample pets. If you make a DELETE request to /api/pets/1, it'll
    // respond with 204 (success!). Then, on second GET request, you'll get only
    // the second pet.
    mockAxios.resetHandlers();
    mockAxios
      .onGet('/api/pets')
      .replyOnce(200, samplePets)
      .onDelete('/api/pets/1')
      .reply(204)
      .onGet('/api/pets')
      .replyOnce(200, samplePets.slice(1));

    // This test may require some changes to Root, PetList, SinglePet AND
    // DeletePet.
    const wrapper = mount(<Root />);

    // First, we'll wait for Root to fetch the list of pets from /api/pets
    await waitForExpect(async () => {
      wrapper.update();
      expect(wrapper.html()).to.contain('Rigatoni');
      expect(wrapper.html()).to.contain('Cody');

      // Find the delete button for Rigatoni and click it.
      const deletePet1Button = wrapper.find('.delete-button').at(0);
      deletePet1Button.simulate('click');

      // Next, we'll wait for Root to update it's state (either by making
      // anoother GET request or by simply removing the pet from state) and
      // re-rendering.
      await waitForExpect(async () => {
        expect(deleteRequests()).to.have.lengthOf(1);
        expect(wrapper.html()).to.not.contain('Rigatoni');
        expect(wrapper.html()).to.contain('Cody');
      });
    });
  });
});
