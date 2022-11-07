import React from 'react'

export default function NewAnnouncementPage() {
  return (

    <>
    <div className="">
        <label for="country" className="block text-sm font-medium text-gray-700">Type</label>
        <select id="country" name="country" autocomplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option>Info</option>
        <option>Request</option>
        <option>Warning</option>
        </select>
    </div>
    <div>
    <label for="about" className="block text-sm font-medium text-gray-700">About</label>
    <div className="mt-1">
        <textarea id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
    </div>
    <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
    </div>
    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
    </div>
    </>
  )
}
